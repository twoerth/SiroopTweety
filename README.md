# SiroopTweety

Proof of concept for a hackday.

In a nutshell, we show a small icon to employees so that they can check that they have been cookied properly and their traffic will be flagged in analytics.

The bird has been doing nothing other than that. We want to give it more powers.

The initial idea is to allow it to be used to toggle a panel allowing employees to give feedback directly on the page.

Intended flow:
- visit the site as normal
- spot something strange
- click on Tweety (a panel with a feedback form appears)
- enter feedback
- click submit (the content of the form is submitted along with the url)

Backend:
- a lambda handles form submissions
- submissions are saved into a DynamoDB
- submissions can be viewed using a different lambda function
