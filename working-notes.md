We are supposed to test only public methods or properties. ie things that are going to be accessed outside of our instantiated object.

- How can I know for certain whether or not a property is going to be accessed by another unit if I am still in the early stages of my program, and I don't have any other units created yet. There will be methods/props that will be obviously public, but some others I am not sure at this stage?

---

I have decided to use factory functions instead of classes for this project.

---

Breakthrough: I needed to encapsulate my objects much more than I would have. Really think about what other units actually need to access. Why would they need length? No reason really so don't make that property public. We need to think more about the behaviour of the object rather than all the internal state to deliver that behaviour!
