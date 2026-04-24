## New Component :node-cron
To automatically manage time-based events in the system I'll be using a small scheduled worker (node-cron). This worker will run periodic tasks that keep data consistent and perform background maintenance.

### Planned features
- Automatically mark assignments as **"overdue"** when their due date has passed.
- Optionally send reminder emails or notifications before due dates (future feature).

### Implementation notes (Milestone plan)

- Add a lightweight cron job that runs once per day and checks assignments in the repository for due dates in the past; update their status to `overdue`.
 
- For Milestone 1 the job can operate against the in-memory repository or the Firestore implementation (when available).

