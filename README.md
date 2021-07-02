_Note: the most updated iteration of the python version of this assignment is now hosted at [https://ethicalcs.github.io/](https://ethicalcs.github.io/)_

# The Ethical Engine: An Ethical Design Project for CS 1 
**Authors**: [Evan Peck](http://www.eg.bucknell.edu/~emp017/) (Bucknell University), Gabbi LaBorwit (Bucknell University '20)

The Ethical Engine is a python programming project that is designed to engage introductory CS students with ethical design. The scaffolding and rationale behind this project will [can be read at this Medium post](https://medium.com/@evanmpeck/the-ethical-engine-integrating-ethical-design-into-intro-to-computer-science-4f9874e756af).

The _Ethical Engine_ project consists of two parts:
1. **Building the Ethical Engine:** Modeled off of [MIT's Moral Machine](http://moralmachine.mit.edu/), students are presented with [randomly-generated scenarios](student_code/scenario.py) in which an autonomous car must decide between saving the passengers in the car OR the pedestrians in the crosswalk. They must write a program that will input _any_ potential scenario, and output who the car should save. There are a number of factors that students must take into account, including demographics (age, gender, etc.), profession (doctor, homeless, criminal, etc.), body type, whether pedestrians were crossing the street legally, and whether the car must swerve to save the pedestrians.

2. **Algorithm Audit:** The instructor will obfuscate the _ethical engines_ that students have constructed in such a way that the code can be called as a python module but is not human readable. With these modules now acting as proprietary code, students must perform a [_scraping audit_](http://www-personal.umich.edu/~csandvig/research/Auditing%20Algorithms%20--%20Sandvig%20--%20ICA%202014%20Data%20and%20Discrimination%20Preconference.pdf) of 3-5 _ethical engines_ that have been provided to them. By writing a program to run thousands of scenarios and recording the results, students should be able to articulate how the programs they are auditing may be biased towards different groups of people.
