# Java Documentation

This documentation will help you implement your decision engine for an autonomous vehicle.

Fill in the `decide` method with a program that analyzes the given scenario and returns a `Decision` enum to indicate which group to save: `Decision.PASSENGERS` or `Decision.PEDESTRIANS`. See below for the data available in each scenario.

## Scenario Information

| Method | Returns | Type |
|--------|---------|------|
| getPassengers() | Array of people in the car | Person[] |
| getPedestrians() | Array of people who are near the car | Person[] |
| hasPedestriansInLane() | Whether or not the pedestrians are in the street | boolean |
| isLegalCrossing() | Whether or not the people are crossing legally | boolean |
| hasYouInCar() | Whether or not you are in the car | boolean |

## Accessing Person Objects

You can loop over all of the passengers (or pedestrians) like so:

```java
Person[] passengers = scenario.getPassengers();
for (Person person : passengers) {
    String charType = person.getCharacterType();
    System.out.println(charType);
}
```

You can also select a specific person by their index:

```java
Person[] pedestrians = scenario.getPedestrians();
if (pedestrians.length >= 1) {
    Person firstPed = pedestrians[0];
    String charType = firstPed.getCharacterType();
    System.out.println(charType);
}
```

## Person Information

| Method | Returns | Type |
|--------|---------|------|
| getCharacterType() | What kind of character they are | String: "human", "cat", or "dog" |
| getAgeGroup() | If human, their age group | String: "baby", "child", "adult", "elderly" |
| getGender() | If human, their gender | String: "male", "female" |
| getBodyType() | If human adult, their body type | String: "overweight", "athletic", "average", "average" |
| getProfession() | If human adult, their job | String: "doctor", "CEO", "criminal", "homeless", "unemployed", "unknown" |
| isPregnant() | If human female, whether or not they are pregnant | boolean |
| isYou() | Whether or not they are you | boolean |
