# Infinite landing page

One-page site for the Infinite app, with a direct Android APK download.

```
index.html      the page
style.css       styles (same colours as the app)
script.js       fills the live year bar from the visitor's date
deserve.png     logo and favicon
downloads/      Infinite-1.0-android-debug.apk
```

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server 5500` in this folder.

## Host it (GitHub Pages)

Push this folder to a repo, then Settings > Pages > Deploy from a branch > `main` and `/ (root)`.

## Ship a new APK

1. Put the new file in `downloads/`.
2. In `index.html`, change the file name in both Download APK links, the "File" line, the version and size, and the SHA-256 checksum.
   Get the checksum with `sha256sum downloads/<file>.apk`.
