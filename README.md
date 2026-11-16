# Command Center

**An agenda-first desktop app for running a small studio's business admin, on macOS and Windows.**

Claude handles the busywork across your email, Slack, projects, clients, agents and money. Only what needs you reaches
you: things to **Approve**, **Review**, **Reply** to and **Decide**. It comes in three short touchpoints a day, at
7:30 AM, 1:00 PM and 6:00 PM. Your data stays on your computer. Nothing is sent, paid or published without your click.

This repository holds only the installers and the guide. The code isn't kept here.

## Download

Get the newest version from **[Releases](https://github.com/sKittyKat/command-center-releases/releases/latest)**:

| Your computer | The file |
|---|---|
| **Mac** (Apple silicon or Intel) | `Command-Center-<version>-universal.dmg` |
| **Windows** 10 or 11 (x64 or Arm) | `Command-Center-Setup-<version>.exe`, which installs the build that fits your PC |

### Opening it the first time

The apps aren't signed yet, so your system asks once before opening them:

- **Mac.** Open the `.dmg` and drag Command Center into Applications, then open it. When macOS says it can't check the
  app, open System Settings › Privacy & Security, scroll down to Command Center and choose **Open Anyway**. On macOS 14
  or earlier you can instead right-click the app and choose **Open**.
- **Windows.** Run the installer. When SmartScreen says it protected your PC, choose **More info**, then **Run anyway**.

After that it opens like any other app. It starts with your computer and keeps running in the menu bar (Mac) or the
notification area (Windows), so your briefs arrive even with the window closed.

## Setting up

The first launch walks you through it, one step at a time: your workspace, Claude, your email and Slack, how mail is
sorted, then your books, Notion, your sites and backups. It ends on your inbox, sorted. Every step after the first can
be skipped and done later from Settings.

**[The guide](GUIDE.md)** covers each step, daily use, costs, privacy and moving to a new computer.

## What it costs

Command Center is free. Claude is paid for one of two ways, and you choose which:

- **Your own Anthropic API key**, pay as you go.
- **Your Claude plan**, through Claude Code on your computer.

Either way, Claude only sorts and drafts once you turn that on, under a monthly cap you set ($50 to start). Everything
else it connects to (Gmail, Slack, QuickBooks, Stripe, Notion, GitHub, ntfy) is used through free accounts and apps you
make yourself.

## Your data

- **Where it lives:** everything is in your computer's app data folder, `~/Library/Application Support/Command Center` on
  a Mac and `%APPDATA%\Command Center` on Windows. Uninstalling leaves it there.
- **Sign-ins and keys:** these are kept only in the system's keychain.
- **What leaves your computer:** only the calls the features you switch on need. Nothing is loaded from the network
  when the app opens.
- **Updates:** once a day the app asks this repository which version is newest, and tells you when there's a new one.
  You download and install it yourself; nothing installs by itself.
