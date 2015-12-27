# What is BDD  
If you as the Dan North (the originator of BDD) what it is, he would say:
 
> BDD is a second-generation, outside-in, pull-based, multiple-stakeholder, multiple-scale, high-automation, agile methodology. It describes a cycle of interactions with well-defined outputs, resulting in the delivery of working, tested software that matters.
 
That definition is very accessible to people that don't have battle-scarred delivery experience and a firm understanding of Agile testing techniques! So let's try to express is in a way that makes sense to everyone involved in the product development lifecycle:

> BDD allows you to build valuable software faster and with higher quality than traditional Agile techniques 

BDD does not replace Agile per-se, it is an Agile technique only more refined. It's like replacing a Mercedes from an older generation with the latest model! While there's still a certain amount of charm and nostalgia in driving an old Mercedes, the newer one will go faster, handle corners better and be more fuel efficient.     

There are few parts you need to learn in order to do BDD successfully. 

* Deliberate Discovery (workshop)
* Specification by Example (artifacts)
* Ubiquitous Domain Language (concept)

* Modelling by Example (technique)
* Test Driven Development (technique)

* Automation ()


## Deliberate Discovery
Every team starts with some kind of kick-off meeting prior to starting new work. These meetings tend to be free-form (as they should be) and the outputs of these meetings tends to get captured in a variety of formats from user-stories (good) to people's heads (not good)!

This is where deliberate discovery comes in. 

This is an exercise involving people from the different team disciplines, typically from product, development and testing, and together they flesh out detailed scenarios by way of examples. The easiest way to understand this is using this contrived conversation below:




The output of this exercise is a specification document

Specification by Example can be seen as second-generation user-stories. Where user-stories established the idea of human-readable acceptance criteria, they left out details about the business case they intended to support. 

Rather than go head-first into creating an entire feature and to later realize that you missed something major due to an oversight, deliberate discovery starts with the domain of the application.
 
## What is the Domain?


 

You may have heard the "Three Amigos" label attached to this exercise, or you may have not heard a name for it at all.

expressed 
 using examples, or in other words, a Specification by Example (SbE) document.
 
The SbE 
 
 This exercise has two major outcomes:

1. It reduces oversights in the requirements 
2. Creates a shared understanding between all parties prior to development

The conversations you have in deliberate discovery are the most important part of BDD. If you do only one thing from BDD, it would be to have these conversations. This is where the product people state the business need, the testers with their Jedi skills are able to see issues before they even occur, and developers apply their logical wits to ensure things make sense. 

When this exercise is done properly, a ubiquitous domain language emerges and amongst many benefits, this language speeds up development by reducing the translation cost from requirements to code.

Next, a developer takes the specifications and uses the **ubiquitous domain language** to make them executable. This is where modeling by example is employed.

## BDD != TDD with another syntax
Calling these two the same with different syntax is like saying the Sun and the Solar system are the same with different rotations!

Test Driven Development (TDD) is a process that starts with a specification and uses tests that verify the specification to drive the development of the actualizing code. **TDD is a developer only activity.**

Behaviour Driven Development (BDD) is a process that spans across the entire product development lifecycle, starting with the initial definition of the specification. **BDD is a team-wide activity.**
