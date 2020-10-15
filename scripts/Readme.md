# Infrastructure Scripts

## enrich-actionkit-data

This was a one-off to augment our user data in ActionKit with county and work elections jurisdiction data so that our email templates could make use of that info.

1. Export all users in AK to a CSV
2. Run these scripts on that CSV (I think I ran county first then jurisdiction -- again, it was a one-off)
3. Import the CSV back into ActionKit
