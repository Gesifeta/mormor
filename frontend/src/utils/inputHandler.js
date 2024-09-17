//helper function to handle user inputs
//accepts event, data, and a callback function
export default function userInputHandler(
  event,
  data,
  callBack//state management
) {
  let target = event.target;
  callBack({
    ...data,
    [target.name]: target.value,
  });
}
