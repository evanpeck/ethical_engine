# Notes on Student Files





Part 2 depends on students reverse engineering another student's code... essentially treating it as a proprietary algorithm. To replicate this experience, we will obfuscate python code before passing it along.

You can do this any way that you'd like. We used  [pyminifier](https://liftoff.github.io/pyminifier/) (you'll have to install yourself) in the following way:

`pyminifier --replacement-length=5 --obfuscate-variables --obfuscate-builtins --obfuscate-import-methods --gzip -o outputFile.py fileToMinimize.py`

For example, it my code in `engine.py` to:
```
import zlib, base64
exec(zlib.decompress(base64.b64decode('eJxlksFugzAMhu88RZRLYaVVu6kXpOwyrddJ3So2VRxSMCRSSNIENqFp774ApVnXS+T4//zbVlIaVSObg6SGK8RrrUxzF5yINlw2QQEleg/TKAlQS77xkR47nNzHOGdcFENEi1Y0OFnFGEQBRjh9sY4xa2sqh3ROnbzYxLhQ1RTkjTI4cdjT88sIGV5zSYUDes+GCWh4PkhM1SDA2uFSUwFDUEJN+TnWBipJpWvzEGP1CeYLeMXGoTrV4mTzEyBGVu6Yk/aQLnNGzVunIQsQL1G6pBUgLlHrtpwQl5pUbVTp+nMl/0Ne8ew4yi055idOUHPb86iK7jzWKZwtZnEasyhABprWSMSGx9iFGpQW0L+IcxovhByy3udMukVBWOgzKRmJwyrzev+g88nosE6yaLD+CKdv0Ju7CV5z5T5BhTS1FmQFxiYzN8+e7C7k0mtRXxNdF0IBtjGcyrFye1XpxanULbR/JNs/q2Dvj/1WF9Fb4OAX1DbedQ==')))
```

This is not irreversible, but it does make getting the original code a little more difficult to get back. The beauty of this approach is that students who are provided this obfuscated file can still reference it as an ordinary module.
