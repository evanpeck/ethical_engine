from obf_engine import decide
from scenario import Scenario


def audit():
    ''' Determines if the ethical engine exhibits any biases towards
    different people groups.

    The audit method should print out two lists of attributes that explain
    how the underlying ethical engine is making decisions.
        - The first list should contain attributes in which the autonomous
        car is biased towards SAVING
        - The second list should contain attributes in which the autonomous
        car is biased towards KILLING
    In both lists, the attributes should be roughly ranked based on the
    severity of the bias. This might not be perfect, but should at least
    detect significant trends.

    To accomplish this, write a program that runs many thousands of scenarios
    (at least 10000) and keep track of the results.
    '''
    pass




if __name__ == '__main__':
    audit()
