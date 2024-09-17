import { useEffect, useState } from "react";
import client from "../containers/client";
import {
  userData,
  userQuery,
  commentData,
  pinData,
} from "./query";

function MormorData() {
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(null);
  const [comment, setComment] = useState(null);
  useEffect(() => {
    client.fetch(userData()).then((data) => {
      setUser(data);
    });
  }, []);
}
export default MormorData;
