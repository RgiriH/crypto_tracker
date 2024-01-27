import { React ,useState} from 'react'
import { Box, TextField, Button } from "@material-ui/core"
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";


const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        if (!email || !password) {
          return
      }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
       password
       );
      setLoading(false);
        console.log(result);
        handleClose();
        alert("Login successful");
        
    } catch (error) {
      alert(error?.message);
      setLoading(false);
      return;
    }
  };
    
    return (
      <Box
        style={{
          padding: "3px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          label="enter the email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="enter the password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled = {loading}
        >
          Login
        </Button>
      </Box>
    );
}
export default Login