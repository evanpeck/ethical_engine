# Notes 

Students will be constructing code that decides who to save in any scenario - the passengers in the car or the pedestrians in the crosswalk.

To see the engine in action, open index.html in a browser, open the console, and click the "Run Ethical Engine Once" button.

**List of files:**
- 'index.html'  contains code that when opened in a browser, provides a simple GUI that allows students 
to run all of the below code.
- `scenario.js` contains code to randomly generate scenarios, including a `Scenario` and `Person` class. Students should not need to touch this.
- `main.js` contains code that will run random scenarios - outputing them to the user to see in the console, and also making a decision based on the `decide` method constructed in `engine.py`.
- `engine.js` is where students will code the decision-making of their car. It contains two sample decision algorithms.  One is more sophisticated while the commented out one is a demo that simply decides that passengers should be saved if there are more passengers than pedestrians.  Instructors
can elect to exclude the more sophisticated code if they want to present a more challenging assignment
to their students.
- `auditor.js` contains code that will audit the student's decision engine.  It runs the student's
decision engine 10,000 times.  Student's do not need to touch this code.

After creating their engines students will also do a number of follow up tasks:
- Test their engine against 10000 automatically scenarios.  This test produces a statistical breakdown
that reveals who the engine advantages and disadvantages.
- Testing their engine against their own intuitive judgments. Students are asked to work through 20 randomly created scenarios and record their intuitive decisions.  They then compare these decisions against the ones
that the engine would make.  
- Compare their engine to fellow student's engines
- Write a 2 to 3 page reflection paper that addresses some of the following questions: "What principles of justice/fairness were you attempting to embody in your decision engine? How well did you succeed in embedding these principles into your engine?  What (if any) compromises did you have to make?  Compare your own engine to one of your classmates -- what were the merits and demerits of your engine compared to your classmates?  What are some larger lessons about the relationship between justice/fairness and the development of algorithms that you learned from doing this assignment? What are the benefits and costs of attempting to express justice and fairness through this exercise?  Is it possible to create algorithms that are neutral?"  
