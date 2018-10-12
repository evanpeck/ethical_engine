# C++ Documentation

This documentation will help you implement your decision engine for an autonomous vehicle.

Fill in the `decide` method with a program that analyzes the given scenario and returns a `string` to indicate which person to save: `"passenger"` or `"pedestrian"`.

## Scenario Information

The arguments to the `decide` method provide details about the scenario.

| Type | Argument | Description |
|--------|---------|------|
| `Person` | `passenger` | Vector of people in the car |
| `Person` | `pedestrian` | Vector of people who are near the car |
| `bool` | `hasPeds` | Whether or not the pedestrians are in the crossing lane |
| `bool` | `isLegal` | Whether or not the people are crossing legally |
| `bool` | `hasYou` | Whether or not you are in the car |

## Person Information

These methods provide details about the people in the scenario.

| Method | Descrption | Return Values |
|--------|---------|------|
| `getCharacterType()` | What kind of character they are | `string`: `"human"`, `"cat"`, or `"dog"` |
| `getAgeGroup()` | If human, their age group | `string`: `"baby"`, `"child"`, `"adult"`, `"elderly"` |
| `getGender()` | If human, their gender | `string`: `"male"`, `"female"` |
| `getBodyType()` | If human adult, their body type | `string`: `"overweight"`, `"athletic"`, `"average"` |
| `getProfession()` | If human adult, their job | `string`: `"doctor"`, `"CEO"`, `"criminal"`, `"homeless"`, `"unemployed"`, `"unknown"` |
| `isPregnant()` | If human female, whether or not they are pregnant | `bool` |
| `isYou()` | Whether or not they are you | `bool` |
