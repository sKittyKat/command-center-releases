# Command Center: the guide

This guide is for version 0.2.0. It covers installing, setting up, daily use, what things cost, your data, and moving to
a new computer. The app's words are in **bold**.

- [1. Install](#1-install)
- [2. The set-up](#2-the-set-up)
- [3. Every day](#3-every-day)
- [4. More you can turn on](#4-more-you-can-turn-on)
- [5. What it costs](#5-what-it-costs)
- [6. Your data and privacy](#6-your-data-and-privacy)
- [7. Updates, backups and a new computer](#7-updates-backups-and-a-new-computer)
- [8. When something's off](#8-when-somethings-off)

## 1. Install

Download the newest installer from [Releases](https://github.com/sKittyKat/command-center-releases/releases/latest).

**Mac** (Apple silicon or Intel): open `Command-Center-<version>-universal.dmg` and drag Command Center into
Applications.
1. Open it once. macOS says it can't check the app, because the app isn't signed yet.
2. Open System Settings › Privacy & Security, scroll to Command Center and choose **Open Anyway**.
3. On macOS 14 or earlier you can instead right-click the app and choose **Open**.

You only do this once.

**Windows** 10 or 11 (x64 or Arm): run `Command-Center-Setup-<version>.exe`.
1. If SmartScreen says it protected your PC, choose **More info**, then **Run anyway**.
2. Follow the installer. It picks the x64 or Arm build for you.

Command Center starts with your computer and keeps running in the menu bar (Mac) or the notification area (Windows), so
your briefs arrive with the window closed. Quit it from that icon's menu. You can turn **Launch at login** off in
Settings.

## 2. The set-up

The first time it opens, Command Center shows **Set up** instead of its usual screens:
- **On the left:** the steps, with how many are done.
- **On the right:** one step at a time.
- **At the bottom of each step:** **Back** on the left, and **Skip for now** or **Next** on the right.

Your workspace comes first. Every step after it can be skipped and done later, here or in Settings. Settings ›
Workspace shows how far you got and has **Open the set-up**. Each card in the set-up is the same card Settings shows,
under the same name.

If you'd rather look around first, **Look around the demo first** opens a sample business you can click through. Its
sidebar has **Set up your workspace** to bring you back.

### Step 1: Your workspace

Type your name and choose **Start your workspace**. This is where your real mail and work go, on your computer's own
clock. The demo stays one click away in Settings and never sends anything.

**Moving from another computer?** Use **Restore from a backup** instead; see
[A new computer](#a-new-computer).

### Step 2: Claude

Choose how Claude is paid for:
- **API key**: pay as you go, billed by Anthropic. Make a key at platform.claude.com and paste it in. Command Center
  checks it with Anthropic (free), then keeps it in your system's keychain. It never shows the key again.
- **Claude plan**: uses your Claude subscription through Claude Code. Install Claude Code, sign in to it once by running
  `claude` in a terminal, then choose **Check**. It shares your plan's limits with your own Claude Code use.

Set the **Monthly cap**: the most Claude may use in a month ($50 to start). At the cap Claude pauses until the 1st, and
nothing else stops. Raising the cap asks you to confirm.

### Step 3: Email and Slack

Command Center reads your work Gmail and your Slack on this computer. It sends only the replies you approve. Each source
uses an app you make yourself, for free, so no one else's app holds your mail. The steps are shown in the app too.

**Gmail** takes about 10 minutes. You make a sign-in client in Google Cloud:
1. At console.cloud.google.com, signed in with your work account, make a project called Command Center. It needs no
   billing.
2. APIs & Services › Library: turn on the **Gmail API**.
3. Google Auth Platform: name it Command Center and set its audience to **Internal**. With a personal Gmail rather
   than Google Workspace, see [Google won't let me choose Internal](#google-wont-let-me-choose-internal).
4. Data access: add `gmail.readonly` (to read your mail and your past replies) and `gmail.send` (to send a reply you
   approve). Nothing else.
5. Clients › Create client › **Desktop app**. Paste its client ID and secret into Command Center and choose **Save
   client**.
6. Choose **Sign in with Google**. Google's page opens in your own browser. Pick your work account and allow it. Your
   password never reaches Command Center.

**Slack** takes about 5 minutes. You make an app in your own Slack workspace:
1. At api.slack.com/apps, create an app from scratch called Command Center, in your workspace.
2. **Socket Mode**: turn it on and make the app-level token it offers (`connections:write`). This brings new messages
   without a public server.
3. **OAuth & Permissions › User Token Scopes**. Add:
   - for your direct and group messages: `im:read`, `im:history`, `mpim:read`, `mpim:history`;
   - to match people to clients: `users:read` and `users:read.email`;
   - to send a reply you approve: `chat:write`;
   - only if you want channels read: `channels:read`, `channels:history`, `groups:read` and `groups:history`.
4. **Event Subscriptions**: turn it on and subscribe, on behalf of users, to `message.im` and `message.mpim`. Add
   `message.channels` and `message.groups` if you want channels read.
5. **Install to Workspace**. Paste the app-level token (`xapp-…`) and the User OAuth Token (`xoxp-…`) into Command
   Center, then choose **Connect Slack**.

**Slack channels** (optional): once Slack is connected, choose **List my channels**. Turn **Read** on for each channel
you want in your inbox, Slack Connect channels shared with clients included, and say whose channel each is. Only the
channels you pick are read.

**Texts** (SMS, iMessage, WhatsApp) aren't read: there's no free, official way in for your own number.

### Step 4: Sorting

Two switches decide how your mail is sorted. Each asks first, telling you the most one call can cost.
- **Claude sorts new mail.** Free rules file the obvious first: newsletters, notifications, things you already answered.
  Claude sorts the rest into what needs you and what doesn't.
- **Claude drafts replies.** For a message that needs a reply, Claude writes a draft in your voice, learned from your
  own past replies. Nothing is sent until you approve it.

With both off, the rules still sort for free, and the rest waits for you.

### Step 5: Books

QuickBooks and Stripe are read in. Invoices and payment reminders go out only on your click. Moving money is always
yours.

**QuickBooks** uses your own Intuit app with production keys:
1. At developer.intuit.com, create an app called Command Center for QuickBooks Online, with the accounting scope.
2. Keys and credentials › Production: add an `https` address of yours as a redirect URI. It needn't show anything:
   you'll copy the address your browser lands on.
3. Paste the production client ID, secret and that address into Command Center and choose **Save app**.
4. Choose **Sign in to QuickBooks**, pick your company in your browser, and paste back the address the browser lands on
   (within 15 minutes).

**Stripe:** make a **restricted key** with read access to the balance, payments and payouts only, and paste it in. A
full secret key is refused.

### Step 6: Notion

If your clients and projects live in Notion, bring them in, then retire Notion. Command Center only reads Notion; it
never writes there.
1. At app.notion.com/developers/connections, as your workspace's owner, create an **internal connection** called Command
   Center.
2. On its Configuration tab, let it **read content only**: untick updating and inserting content and any comment boxes,
   and choose no user information.
3. On its Content access tab, pick every page and database you still use. A page's children come with it.
4. Copy its API token (it starts `ntn_`), paste it in, and choose **Connect Notion**.
5. In the **Notion import** card, check what each database becomes (Clients, Projects, Milestones, Contacts, or Not
   imported), then choose **Import**. It's one change you can undo from the action log.
6. When nothing live remains, tick the checklist and choose **Retire Notion**.

### Step 7: Your sites

For the site agent: add each website's GitHub repository with a **fine-grained token** for that repository, with
**Contents** and **Pull requests** read and write. Agents work on a copy, on a branch of their own, and never hold the
token. A QA check runs on every change, and nothing is merged until you choose **Accept and merge**.

### Step 8: Backups

Each night after the 6:00 PM wrap, your workspace and its files are sealed with a passphrase and copied to a folder you
choose: iCloud Drive, OneDrive or a USB drive keeps them off this computer.
- Type a passphrase of at least 12 characters (four or more words) twice. Keep it in your password manager: **without
  it no backup can be opened.**
- Choose **Choose a folder and back up**. The newest 14 backups are kept.

### Your inbox

The last page shows your mail as its first sync and sort leave it:
- how many messages were read;
- how many were filed for you, how many need you, and how many are still to sort;
- **What's left**: any steps you skipped, each with **Set up**.

Choose **Open your inbox**, and you're done.

## 3. Every day

**The touchpoints.** At 7:30 AM the morning brief, at 1:00 PM the midday sweep, at 6:00 PM the end-of-day wrap. Each
comes as a notification that opens Today. On Mondays at 8:00 AM there's the plan for the week, and on Fridays at
4:00 PM the review. You can move any of them to another quarter hour in Settings › When it reaches you. If the computer
was asleep, the brief lands when it wakes.

**Today** shows what's to do, about how long it takes, what Claude handled overnight, and when the next touchpoint is.
The **Agenda** groups what needs you into four kinds:

| Kind | What it is |
|---|---|
| **Approve** | A reply, invoice or other action Claude prepared. It runs only on your click. |
| **Review** | Work an agent finished and QA checked. |
| **Reply** | A message that needs your answer, often with Claude's draft. |
| **Decide** | Something only you can choose: a slipping milestone, a bill, a flagged charge, a card running out. |

Each item says why it's where it is. Keys work in the agenda:

| Key | What it does |
|---|---|
| ⌘/Ctrl+Enter | The main button |
| E | Edit |
| D | Delegate |
| S | Snooze |
| P | Pin |
| ↑ / ↓ | Move between items |
| Esc | Close |

**⌘K** on a Mac, **Ctrl+K** on Windows, opens the command bar to find anything or run a quick action.

**Nothing speaks for you on its own.** Settings › What Claude may do sets, for each kind of work, whether Claude may do
it (**Auto**), must ask (**Approve**) or only prepares it (**Only you**). Anything that sends, publishes or speaks for
you is always at least **Approve**. The **Spend limit** covers money paid to others. Everything Claude and you do lands
in the **Action log**, with **Undo** where it can have one.

## 4. More you can turn on

- **Phone alerts** (Settings › When it reaches you): what can't wait (due within 4 hours or overdue), sent to your
  phone within a minute through the free **ntfy** app.
  - Command Center makes a long random topic; subscribe to it in the app, then choose **Send a test**.
  - Quiet hours are 9 PM to 7 AM, with at most 10 alerts a day. You can change both.
- **Morning brief as audio:** the computer's own voice reads the 7:30 AM brief as it lands. Any brief also plays from
  the tray's menu or Today's brief card.
- **Claude writes the briefs:** the briefs are plain and free by default. With this on, Claude writes them, at one call
  per brief.
- **Statements** (Money › Personal): import bank and card statements (OFX, QFX or CSV), or choose a folder you save them
  in. Bills and subscriptions are worked out from them, and a bill reaches Decide 3 days before it's due. No bank
  sign-in is ever used.
- **Accounts and cards:** keep each client's logins, cards on file and renewals. Only the name of the password-manager
  item and a card's last four digits are kept, never a password or a full card number.

## 5. What it costs

- **Command Center:** free.
- **Claude:** paid for by your API key or your plan, only for what you turn on, under your monthly cap. Settings shows
  this month's use by job. As a rough guide, a busy inbox of about 200 messages and 20 replies a day costs about $1 to
  $1.50 a day, most of it drafts. The free rules file a good share before Claude sees anything.
- **Google Cloud, the Slack app, Intuit's developer app, Stripe's restricted key, Notion's connection, GitHub tokens and
  ntfy:** free.
- **Site agents:** each run has a budget you set ($5 to start), held against Claude's cap. A run only starts when you
  confirm its brief and its cost.

## 6. Your data and privacy

- **Where it lives.** Everything stays on your computer, in `~/Library/Application Support/Command Center` on a Mac and
  `%APPDATA%\Command Center` on Windows. Uninstalling leaves it there.
- **Keys and tokens.** Sign-in tokens and keys are kept only in the system's keychain: the Keychain on a Mac, or
  protected by Windows for your account. They never go in plain files or logs.
- **Mail is data.** Emails, messages, pages and files are treated as data, never as instructions: a message that tries to
  tell Claude what to do changes nothing.
- **Replies.** A reply goes only where the message came from, to its sender and thread, and only on your click.
- **What reaches Claude.** Your mail reaches Claude only while its switches are on, and only what the free rules didn't
  file.
- **What leaves the computer.** Only the calls a feature you switched on needs. Nothing is loaded from the network when
  the app opens, and it works offline; only the features that need a connection wait for one.

## 7. Updates, backups and a new computer

### Updates

Once a day, with the first brief, Command Center asks this repository which version is newest:
1. When a newer one is out, Settings › Updates and the tray say so, with **Download**.
2. Download the new installer and run it over the old app. Your data stays.

Nothing downloads or installs by itself. You can turn **Check for updates** off.

### Backups

Settings › Your workspace › Backup has:
- **Back up now**, which runs straight away;
- **Show the folder** and **Choose another folder**;
- how many backups to keep (7, 14 or 30);
- **Turn backups off**, which forgets the key on this computer and leaves the backups in the folder.

A backup that couldn't be made (a drive unplugged, a full disk) is shown there and tried again within the hour.

### A new computer

1. Install Command Center and open it. The set-up starts.
2. In **Your workspace**, choose **Restore from a backup** and pick the folder holding "Command Center Backups".
3. Pick a backup, type your passphrase, and confirm. Your workspace, its files and your settings come back.
4. Sign-ins don't travel between computers. Command Center names the ones to make again (for example "Sign in again
   on this computer: Gmail, Slack"), and the set-up's steps show them as to do.

A restore on the same computer backs up your current workspace first, so it can be undone the same way.

## 8. When something's off

### The Mac won't open the app

See [Install](#1-install): System Settings › Privacy & Security › **Open Anyway**.

### No notifications on the Mac

Allow them in System Settings › Notifications › Command Center. Settings › When it reaches you says when the system
didn't show the last one. Your briefs still land on Today and in the menu bar.

### Google won't let me choose Internal

**Internal** is for Google Workspace accounts. With a personal Gmail, choose **External**, keep it in testing, and add
yourself as a test user. Google then asks you to sign in again every 7 days.

### Slack says it's missing scopes for channels

Add `channels:read`, `channels:history`, `groups:read` and `groups:history`, and the events `message.channels` and
`message.groups`. Then **Reinstall to Workspace**. If Slack shows a new User OAuth Token, disconnect Slack in Command
Center and connect again with it.

### Claude stopped sorting

Settings › Where it reads from › Inbox says why: the monthly cap reached, no credit left on your Anthropic account, or a
key this computer can't open (save it again under Settings › What Claude may do › Claude). The free rules keep filing in
the meantime.

### A restore asks for a passphrase

The backup was sealed with a key this computer doesn't hold. Type the passphrase you set it up with.

### Something else

The action log has every change, with **Undo** where it can have one. Your data folder is never touched by
uninstalling, so a reinstall picks up where you left off.
