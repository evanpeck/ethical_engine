# Notes Part 1

For Part 1, students will be constructing code that decides who to save in any scenario - the passengers in the car or the pedestrians in the crosswalk.

To see it in action, open index.html in a browser and click the "Run Ethical Engine Once"
button or the "Run Audit (Runs Ethical Engine 10000 times)" button. Make sure the browser's console is open (e.g. In Chrome press "F12")

**List of files:**
- 'index.html'  contains code that when opened in a browser, provides a simple GUI that allows students 
to run all of the below code.
- `scenario.js` contains code to randomly generate scenarios, including a `Scenario` and `Person` class. Students should not need to touch this.
- `main.js` contains code that will run random scenarios - outputing them to the user to see in the console, and also making a decision based on the `decide` method constructed in `engine.py`.
- `engine.js` is where students will code the decision-making of their car. It contains two sample decision algorithms.  One is more sophisticated while the commented out one is a demo.  Instructors
can elect to exclude the more sophisticated code if they want to present a more challenging assignment
to their students.
that simply decides that passengers should be saved if there are more passengers than pedestrians.
- `auditor.js` contains code that will audit the student's decision engine.  It runs the student's
decision engine 10,000 times.  Student's do not need to touch this code.
- 'index2.html' and 'ethical_engine.js' these files aggregate all the code in the above js files.  They can be used in lieu of the above if you want to work with Javascript that doesn't require using
import and export statements.

# Notes Part 2

- After creating their decision engines, students should:
-- Audit their code using the auditing tool (if their decision engine works they should be able to run it simply by clicking on the "Run Audit" button in their browser)
-- Exchange their engine with two other classmates and audit their classmate's engines
-- Write a short essay where they reflect on the coding and auditing experience.  In particular students
should address the following questions:  "What principles of justice/fairness were you attempting to embody in your decision engine? How well did you succeed in embedding these principles into your engine?  What (if any) compromises did you have to make?  Compare your own engine to one of your classmates -- what were the merits and demerits of your engine compared to your classmates?  What are some larger lessons about the relationship between justice/fairness and the development of algorithms that you learned from doing this assignment?  Is it possible to create algorithms that are neutral?
