# Entropy A.I. using Natural Language
<a href="https://www.gnu.org/licenses/gpl-3.0" target="_blank"><img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg" alt="License: GPL v3"/></a>
Entropy gleans its insights from deep NLU (subtopic in NLP) analysis of written communication. An alpha implementation using NLU and Deep learning with WireApp chat platform providing the interaction interface. There is currently one use case:

* answer questions about phrases and sentences typed

In its simplified form, this is an expanded version of Maximum likelihood model called Max Entropy:
<img width="300" src="https://user-images.githubusercontent.com/1756903/32816722-17b7e470-c96f-11e7-8225-9ee0e0882343.png">

## R Examples (release date: TBD):
```r
entropy:analyze('Hello, we are on a mission to change how consulting is done.')
```

```r
## [1] "Result"        "driven"        "Passive voice" "Concise"      
## [5] "Informal"      "Thoughtful"    "Assertive"
```

```r
entropy:analyze("Don't get us wrong, we love sales people. They are nice people. We like spending time with them. But we also belief that in consulting a direct connection with a technical member is key to a successful engagement.")
```

```r
## [1] "Positive" "Formal"   "Verbose"
```

## Architecture

<img width="700" src="https://user-images.githubusercontent.com/1756903/33036933-d9a46b52-cde4-11e7-84f6-36c09c1be10b.png">

## Try It Now

**Steps:**

1. Register a new temporary user on [app.wire.com](https://app.wire.com/auth/#register)
2. Follow all the usual wire's activation procedures *(i.e. email confirmation - Sorry!)*
3. Enable the bot by clicking here: [caura.co/entropy-ai](https://www.caura.co/entropy-ai)

*(Non-IE/Chrome users: please allow 3rd party cookies under Cookie Control)*
*if step (3) fails , alternatively sign-in with the same credentials to [w.caura.co/entropybot](https://w.caura.co/entropybot)*

## About / Contributions

[@segahm](https://segah.me) and [team](https://github.com/caura) - Caura & Co.<br/>
[@dkovacevic](https://github.com/dkovacevic) - Wire dev. support and troubleshooting<br/>

[![Caura & Co.](https://media.giphy.com/media/3ov9jWL0UzwzwvsPTi/giphy.gif "telephone operators")](https://www.caura.co)

## How To Stay Up To Date

[caura.co](https://www.caura.co) - will be launched publicly here.<br>
[segah.me](https://segah.me) - will put up an announcement on this blog.

EQ engine - updates are handled by Caura & Co.<br>
Wire SDK - see Wire link above for this git repo for updates to their SDK<br>
Sample use cases - we reserve the right to switch and disconnect these as we please
