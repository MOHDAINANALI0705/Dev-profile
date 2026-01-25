
'use client'
import React, { useEffect, useState } from 'react'


type Contribution = {
    id: string
    date: string
    name: string
    amount: number
    category: string
    note?: string
}

export default function Page() {
    const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
    const [name, setName] = useState('')
    const [amount, setAmount] = useState<number | ''>('')
    const [category, setCategory] = useState('Donation')
    const [note, setNote] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [pending, setPending] = useState<Contribution[]>([])

    // Inject Bootstrap CSS (client-side)
    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
        document.head.appendChild(link)
        return () => {
            document.head.removeChild(link)
        }
    }, [])

    useEffect(() => {
        const raw = localStorage.getItem('pendingContributions')
        if (raw) setPending(JSON.parse(raw))
    }, [])

    useEffect(() => {
        localStorage.setItem('pendingContributions', JSON.stringify(pending))
    }, [pending])

    function validate(): boolean {
        if (!name.trim()) {
            setError('Contributor name is required.')
            return false
        }
        if (amount === '' || Number(amount) <= 0) {
            setError('Amount must be greater than 0.')
            return false
        }
        setError(null)
        return true
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!validate()) return

        const contribution: Contribution = {
            id: crypto.randomUUID(),
            date,
            name: name.trim(),
            amount: Number(amount),
            category,
            note: note.trim() || undefined,
        }

        try {
            const res = await fetch('/api/contributions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contribution),
            })
            if (!res.ok) throw new Error('Network response not ok')
            setSuccess('Contribution saved.')
        } catch {
            setPending((p) => [contribution, ...p])
            setSuccess('Saved locally (offline mode).')
        } finally {
            setName('')
            setAmount('')
            setCategory('Donation')
            setNote('')
            setTimeout(() => setSuccess(null), 3000)
        }
    }

    async function syncPending() {
        if (!pending.length) return
        const remaining: Contribution[] = []
        for (const c of pending) {
            try {
                const res = await fetch('/api/contributions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(c),
                })
                if (!res.ok) remaining.push(c)
            } catch {
                remaining.push(c)
            }
        }
        setPending(remaining)
        setSuccess(remaining.length === 0 ? 'All pending synced.' : `${remaining.length} remaining.`)
        setTimeout(() => setSuccess(null), 3000)
    }

    function removePending(id: string) {
        setPending((p) => p.filter((c) => c.id !== id))
    }

    return (
        <main className="container my-5" style={{ maxWidth: 900, fontFamily: 'system-ui, sans-serif' }}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="h4 mb-0">Daily Contribution</h1>
                        <small className="text-muted">Keep records of contributions</small>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Date</label>
                            <input
                                className="form-control"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Day</label>
                            <input
                                className="form-control"
                                type="day"
                                value={new Date(date + 'T00:00').toLocaleDateString(undefined, { weekday: 'long' })}
                                readOnly
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Contributor Name</label>
                            <input
                                className={`form-control ${error && !name.trim() ? 'is-invalid' : ''}`}
                                type="number"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="enter today's contribution"
                                required
                            />
                        </div>

                    
                        <div className="col-12 d-flex gap-2">
                            <button type="submit" className="btn btn-primary">Add Contribution</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => { setName(''); setAmount(''); setCategory('Donation'); setNote('') }}>
                                Reset
                            </button>
                            {pending.length > 0 && (
                                <button type="button" className="btn btn-outline-success ms-auto" onClick={syncPending}>
                                    Sync Pending ({pending.length})
                                </button>
                            )}
                        </div>

                        <div className="col-12">
                            {error && <div className="alert alert-danger mb-0">{error}</div>}
                            {success && <div className="alert alert-success mb-0">{success}</div>}
                        </div>
                    </form>
                </div>
            </div>

            {pending.length > 0 && (
                <section className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="h5 mb-0">Pending (local)</h2>
                        <small className="text-muted">Stored until synced</small>
                    </div>

                    <ul className="list-group">
                        {pending.map((c) => (
                            <li key={c.id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-semibold">{c.name} <span className="badge bg-secondary ms-2">{c.category}</span></div>
                                    <div className="text-muted small">{c.date} · ${c.amount.toFixed(2)}{c.note ? ` — ${c.note}` : ''}</div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removePending(c.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}