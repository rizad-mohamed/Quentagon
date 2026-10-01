# Security

Report suspected vulnerabilities privately to rizad.dev@gmail.com. Include affected files, reproduction steps, and impact; do not publish credentials or an exploit in a public issue. No response-time guarantee or formal supported-version policy is currently established.

The site is a static frontend. Enquiries open a local email draft rather than reaching a backend. Public build variables are embedded in the exported site and must never contain secrets.

Keep credentials in local ignored environment files or the hosting platform's secret store. If a credential is exposed, revoke or rotate it immediately; deleting a file does not remove it from Git history.
