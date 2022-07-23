# Angular dialog statefull and stateless

When something is “stateful”, it is a central point that stores information in memory about the app/component’s state. It also has the ability to change it. It is essentially a “living” thing that has knowledge of past, current and potential future state changes.

When something is “stateless”, it calculates its internal state but it never directly mutates it. This allows for complete referential transparency meaning that given the same inputs, it will always produce the same output. These are not essentially “living” as they are merely passed information. This means it has no knowledge of the past, current or future state changes.
