# Himalayan Trails — React + Supabase Travel Booking App

A complete starter travel enquiry platform for Himachal tours, group trips, village stays, remote experiences and spiritual journeys.

## Included

- React + Vite
- Supabase Auth
- Username + password login (no Google, no user-facing email)
- User profile/travel requirements
- 19 destinations
- 13 seeded tours/packages
- Group tours, village stays, remote trips and spiritual tours
- Spiti + Chandratal package
- Devi Darshan: Baglamukhi, Kangra Ji, Jwala Ji, Chamunda Ji
- Separate Baglamukhi spiritual Pooja/Hawan/Anushthan package
- Booking/enquiry flow with no payment
- User "My Enquiries"
- Admin dashboard
- Customer list
- Enquiry status management

## 1. Create Supabase project

Create a new project at Supabase.

In Supabase Dashboard:
1. Open SQL Editor.
2. Paste and run `supabase/schema.sql`.
3. In Authentication > Providers, keep Email enabled. The app converts the user's username into an internal email address so the user never needs to provide an email for authentication.
4. If email confirmation is enabled, disable it for this username-only flow, or configure your project accordingly.

## 2. Configure local environment

Copy `.env.example` to `.env`:

VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key

Never put the Supabase service-role key in this frontend.

## 3. Install and run

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## 4. Create the first admin

Create a normal account through the app.

Then run this in Supabase SQL Editor:

```sql
update public.profiles
set role = 'admin'
where username = 'YOUR_USERNAME';
```

Log out and back in. The Admin link will appear.

## 5. Important production note

The username-to-internal-email technique is useful when you want a simple username/password UX, but Supabase Auth is still email-password underneath. If you later want phone OTP, real email verification, password recovery, or more advanced account management, change the auth strategy rather than storing passwords yourself.

## 6. Customization

Package and destination content is seeded in `supabase/schema.sql`. You can edit it in Supabase or build an admin CRUD section later.

No payment integration is included intentionally. An enquiry is created with status `new`, and the admin can move it to `contacted`, `confirmed`, or `cancelled`.
