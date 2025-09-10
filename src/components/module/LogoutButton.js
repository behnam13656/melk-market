"use client"
import { signOut } from "next-auth/react"
import styles from "./LogoutButton.module.css"
import React from 'react'

function LogoutButton() {
  return (
    <button className={styles.button} onClick={signOut}>

        خروج
    </button>
  )
}

export default LogoutButton