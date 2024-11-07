"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  // We'll add our component logic here
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState("");
  const [searchItem, searchItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const searchInventroy = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      if (doc.id.toLowerCase().includes(searchItem.toLowerCase())) {
        inventoryList.push({ name: doc.id, ...doc.data() });
      }
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"flex-start"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={30}
      bgcolor={"#3b3b3b"}
      paddingX={5}
    >
      <Box display={"flex"} flexDirection={"column"} gap={10}>
        <Box display={"flex"} flexDirection={"column"} gap={2.5}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#D0D9CD", // Default background color
                "&:hover": {
                  backgroundColor: "#e0e0e0", // Background color on hover
                },
                "&.Mui-focused": {
                  backgroundColor: "#ffffff", // Background color when focused
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (itemName) {
                addItem(itemName);
              }
              setItemName("");
            }}
            sx={{
              backgroundColor: "#7A8072", // Set background color
              color: "#ffffff", // Set text color
              "&:hover": {
                backgroundColor: "#388e3c", // Set background color on hover
              },
            }}
          >
            Add New Item
          </Button>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2.5}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={searchItem}
            onChange={(e) => searchItemName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#D0D9CD", // Default background color
                "&:hover": {
                  backgroundColor: "#e0e0e0", // Background color on hover
                },
                "&.Mui-focused": {
                  backgroundColor: "#ffffff", // Background color when focused
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              searchInventroy(itemName);
              searchItemName("");
            }}
            sx={{
              backgroundColor: "#7A8072", // Set background color
              color: "#ffffff", // Set text color
              "&:hover": {
                backgroundColor: "#388e3c", // Set background color on hover
              },
            }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateInventory();
              searchItemName("");
            }}
            sx={{
              backgroundColor: "#7A8072", // Set background color
              color: "#ffffff", // Set text color
              "&:hover": {
                backgroundColor: "#388e3c", // Set background color on hover
              },
            }}
          >
            Home
          </Button>
        </Box>
      </Box>
      <Box
        border={"1px solid #333"}
        bgcolor={"#D0D9CD"}
        sx={{ borderRadius: "20px" }}
      >
        <Box
          width="1200px"
          height="100px"
          bgcolor={"#7A8072"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Inventory Items
          </Typography>
        </Box>
        <Stack
          width="1200px"
          height="750px"
          spacing={2}
          overflow={"auto"}
          alignItems={"center"}
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="95%"
              minHeight="75px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f1f0"}
              sx={{ borderRadius: "8px" }}
            >
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                {name.length > 5
                  ? name.charAt(0).toUpperCase() + name.slice(1, 5) + "..."
                  : name.charAt(0).toUpperCase() + name.slice(1).padEnd(7, ".")}
              </Typography>
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                Quantity: {quantity}
              </Typography>
              <Button
                variant="contained"
                onClick={() => removeItem(name)}
                sx={{
                  backgroundColor: "#e32636", // Set background color
                  color: "#ffffff", // Set text color
                  "&:hover": {
                    backgroundColor: "#8b0000", // Set background color on hover
                  },
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
