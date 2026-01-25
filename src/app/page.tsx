"use client";
import React from "react";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();

  const styles: { [k: string]: React.CSSProperties } = {
    page: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(180deg,#f7f9fc,#ffffff)",
      fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#0f172a",
      padding: "32px",
    },
    header: {
      marginTop: "8vh",
      textAlign: "center",
    },
    logo: {
      width: 96,
      height: 96,
      margin: "0 auto 16px",
      display: "block",
      filter: "drop-shadow(0 8px 20px rgba(13, 27, 62, 0.12))",
    },
    title: {
      fontSize: 28,
      fontWeight: 700,
      margin: 0,
      letterSpacing: "-0.02em",
    },
    subtitle: {
      marginTop: 8,
      color: "#475569",
      fontSize: 14,
    },
    actionsWrap: {
      marginTop: "auto",
      marginBottom: 48,
      display: "flex",
      gap: 12,
      width: "100%",
      maxWidth: 420,
      justifyContent: "center",
    },
    primaryBtn: {
      appearance: "none",
      border: "none",
      background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
      color: "white",
      padding: "12px 20px",
      borderRadius: 10,
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 6px 18px rgba(99,102,241,0.18)",
      transition: "transform .12s ease, box-shadow .12s ease",
      flex: "1 1 160px",
      minWidth: 120,
    },
    secondaryBtn: {
      appearance: "none",
      border: "1px solid #cbd5e1",
      background: "white",
      color: "#0f172a",
      padding: "12px 20px",
      borderRadius: 10,
      fontWeight: 600,
      cursor: "pointer",
      transition: "transform .12s ease, box-shadow .12s ease",
      flex: "1 1 120px",
      minWidth: 120,
    },
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <svg
          style={styles.logo}
          viewBox="0 0 64 64"
          role="img"
          aria-label="App logo"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#6366f1" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect rx="14" width="64" height="64" fill="url(#g)" />
          <path
            d="M20 40c6-6 12-10 20-6v6c-8-4-14 0-20 6z"
            fill="rgba(255,255,255,0.95)"
            opacity="0.95"
          />
          <circle cx="32" cy="22" r="8" fill="white" opacity="0.96" />
        </svg>

        <h1 style={styles.title}>Welcome to DevProfile</h1>
        <p style={styles.subtitle}>
          Secure, fast auth built with Next.js — get started or sign in below.
        </p>
      </header>

      <div style={styles.actionsWrap}>
        <button
          style={styles.secondaryBtn}
          onClick={() => router.push("/login")}
          aria-label="Log in"
          onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
        >
          Log in
        </button>

        <button
          style={styles.primaryBtn}
          onClick={() => router.push("/signup")}
          aria-label="Sign up"
          onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
        >
          Sign up
        </button>
      </div>
    </main>
  );
}