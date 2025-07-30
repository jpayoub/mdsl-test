I started by creating a new React Native app using the command
npx @react-native-community/cli init MdslTest.

Then I installed the needed packages for storage and navigation:
@react-native-async-storage/async-storage, @react-navigation/native, @react-navigation/stack, react-native-screens, and react-native-safe-area-context.

After that, I created a src folder.
Inside it, I made a screens folder with two screens: Home.tsx and Transfer.tsx.

I used the rnfe shortcut to quickly write functional components for both screens.

Then I created a navigation folder and inside it I added MainNavigator.tsx.

I installed @react-navigation/native-stack to use the stack navigator.

In the index.tsx file, I made an AppContainer that loads MainNavigator.

Then I changed App.tsx to load the app from AppContainer.

Next, I installed react-native-paper and react-native-vector-icons to help with UI and icons.

I started designing the Home screen.
I divided it into three components:
One for the header (name and profile picture),
One for showing and filtering transactions,
And one for the top-up and transfer money buttons.

I used cards from react-native-paper to make the layout cleaner.

Then I worked on the Transfer screen.
I used Formik and Yup for form validation and error handling.
I added a loading state using setTimeout and showed a toast after the action.

At first, I was updating AsyncStorage directly from the Transfer screen.
But later I realized it’s better to pass update functions from the Home screen.
This made the logic more organized and easier to control.

After finishing Transfer, I copied the same logic to create a Top-Up screen.
I removed the receiver field and made it behave like an incoming transaction.

Most of the app logic is simulated, since it’s a test project.
Payment is not real — I used setTimeout with 2.5 seconds to simulate it.

All data is saved in AsyncStorage, no real database is used.
The user is mock data — there is no login or real account.
Transaction IDs are created using tx${Date.now()} to make them unique.
There are no API calls — everything runs locally.
Balance is calculated in the app using the transactions list.
