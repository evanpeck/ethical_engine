# Notes on Student Files

For Part 1, students will be constructing code that decides who to save in any scenario - the passengers in the car or the pedestrians in the crosswalk.

To see it in action, simply run `main.py`:
`python main.py`

**List of files:**
- `scenario.py` contains code to randomly generate scenarios, including a `Scenario` and `Person` class. Students should not need to touch this.
- `main.py` contains code that repeatedly cycles through scenarios - printing them out for the user to see, and also making a decision based on the `decide` method constructed in `engine.py`.
- `engine.py` is where students will code the decision-making of their car. Currently, it is designed simply so it can be demoed - only save the passengers if there are more passengers than pedestrians.
- `obf_engine.py` _(Part 2 only! - see below)_ is an obfuscated version of `engine.py`. These files will be generated for students so that they can use statistical sampling to detect biases of code that they cannot read.
- `auditor.py` _(Part 2 only!)_ the code that students will write to statistically sample the biases of an obfuscated engine.py

**Note to Instructors:** if you would like to see a potential solution, we have a more polished `engine.py` and `auditor.py` available upon request. Email me at `evan.peck@bucknell.edu`


### Part 2: Auditing the Ethical Engine
Part 2 depends on students reverse engineering another student's code... essentially treating it as a proprietary algorithm. To replicate this experience, we will obfuscate python code before passing it along.

You can do this any way that you'd like. We used  [pyminifier](https://liftoff.github.io/pyminifier/) (you'll have to install yourself) with the following options:

`pyminifier --replacement-length=5 --obfuscate-variables --obfuscate-builtins --obfuscate-import-methods --gzip -o engine.py obf_engine.py`

For example, it transforms our code in `engine.py` to:
```
import zlib, base64
exec(zlib.decompress(base64.b64decode('eJxlksFugzAMhu88RZRLYaVVu6kXpOwyrddJ3So2VRxSMCRSSNIENqFp774ApVnXS+T4//zbVlIaVSObg6SGK8RrrUxzF5yINlw2QQEleg/TKAlQS77xkR47nNzHOGdcFENEi1Y0OFnFGEQBRjh9sY4xa2sqh3ROnbzYxLhQ1RTkjTI4cdjT88sIGV5zSYUDes+GCWh4PkhM1SDA2uFSUwFDUEJN+TnWBipJpWvzEGP1CeYLeMXGoTrV4mTzEyBGVu6Yk/aQLnNGzVunIQsQL1G6pBUgLlHrtpwQl5pUbVTp+nMl/0Ne8ew4yi055idOUHPb86iK7jzWKZwtZnEasyhABprWSMSGx9iFGpQW0L+IcxovhByy3udMukVBWOgzKRmJwyrzev+g88nosE6yaLD+CKdv0Ju7CV5z5T5BhTS1FmQFxiYzN8+e7C7k0mtRXxNdF0IBtjGcyrFye1XpxanULbR/JNs/q2Dvj/1WF9Fb4OAX1DbedQ==')))
```

This is not irreversible, but it does make getting the original code a little more difficult to get back. The beauty of this approach is that students who are provided this obfuscated file can still reference it as an ordinary module.
