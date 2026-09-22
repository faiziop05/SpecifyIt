# SpecifyIt

A React Native app for browsing and comparing mobile phone, smartwatch, and tablet specifications.

## Overview

SpecifyIt lets users explore detailed technical specifications for mobiles, smartwatches, and tablets, sourced from the GSM Arena API. It supports paginated browsing of devices, a search flow, and a "related devices" view so users can compare similar products without leaving the app.

## Problem it solves

Looking up and comparing device specs usually means digging through a desktop-oriented website. SpecifyIt packages that data into a mobile-first browsing experience with pagination and navigation built for quick lookups on the go.

## Key features

- **Device specification browsing** — detailed spec pages for mobiles, smartwatches, and tablets.
- **Paginated device listing** — efficient, incremental loading instead of dumping the full catalog at once.
- **Search** — a dedicated search screen for finding specific devices.
- **Related devices** — surfaces similar/related products from a device's detail page.
- **Image galleries** — dedicated image views per device.
- **Bottom-tab + stack navigation** — combines `@react-navigation/bottom-tabs` and `@react-navigation/stack` for a native app-like navigation structure.

## What's unique about it

- It's built entirely on top of the third-party GSM Arena API via Axios, rather than a bundled/static dataset, so device data reflects the live source.
- Screens are organized under a single `Screens/AllScreens` module with a central `Screens/index.js` export, keeping navigation wiring and screen implementations cleanly separated.

## Tech stack

- **React Native** (0.74) with **Expo** (^51)
- **React Navigation** (bottom tabs, native, stack)
- **Axios** for API calls to the GSM Arena data source
- **expo-linear-gradient**, **react-native-reanimated**, **react-native-gesture-handler** for UI/animation

## Setup / running instructions

```bash
npm install
npm start
```

Run on a specific platform:
```bash
npm run android
npm run ios
npm run web
```
