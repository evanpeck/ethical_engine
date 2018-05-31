# Python Documentation

This documentation will help you implement your decision engine for an autonomous vehicle.

Fill in the `decide` method with a program that analyzes the given scenario and returns a string to indicate which group to save: "passengers" or "pedestrians". See below for the data available in each scenario.

## Scenario Information

| Attribute | Details | Type |
|-----------|---------|------|
| scenario.passengers | Access the people who are passengers | list |
| scenario.pedestrians | Access the people who are pedestrians | list |
| scenario.youInCar | Check if you are in the car | boolean |
| scenario.legalCrossing | Check if the pedestrians are crossing the street legally | boolean |
| scenario.pedsInLane | Check if the pedestrians are in the crossing lane | boolean |

## Accessing Person Objects

You can loop over all of the passengers (or pedestrians) like so:

```python
for person in scenario.passengers:
    print(person.charType)
```

You can also select a specific person by their index:

```python
if len(scenario.pedestrians) >= 1:
    firstped = scenario.pedestrians[0]
    print(firstped.charType)
```

## Person Information

| Attribute | Details | Type |
|-----------|---------|------|
| person.charType | Check the type of character | string: "human", "cat", or "dog" |
| person.age | If human, check their age group | string: "baby", "child", "adult", "elderly" |
| person.gender | If human, check their gender | string: "male", "female" |
| person.profession | If human adult, check their profession | string: "doctor", "CEO", "criminal", "homeless", "unemployed", "unknown" |
| person.bodyType | If human adult, check their body type | string: "overweight", "athletic", "average", "average" |
| person.pregnant | If human female, check if they are pregnant | boolean |
