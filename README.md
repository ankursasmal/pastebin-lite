# Pastebin Lite

Pastebin Lite is a simple Pastebin-like web application built with **Next.js (App Router)** and **MongoDB**.  
Users can create text pastes, receive a shareable URL, and view pastes with optional expiration constraints.

This project was built as a take-home assignment and is designed to pass automated API tests.

---

## 🚀 Features

- Create a paste containing arbitrary text
- Generate a shareable URL for each paste
- View pastes via browser or API
- Optional paste constraints:
  - Time-based expiry (TTL)
  - View-count limit
- Deterministic time handling for automated testing
- Persistent storage (MongoDB)

---

## 🛠 Tech Stack

- **Next.js 16 (App Router)**
- **JavaScript (JSX)**
- **MongoDB Atlas**
- **Mongoose**
- **Tailwind CSS**
- **Vercel (deployment)**

---

## 📦 API Endpoints

### Health Check
