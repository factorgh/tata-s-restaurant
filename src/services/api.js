import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { startOfDay, endOfDay } from "date-fns";

///Get all orders based on a particular day

// Function to get all orders based on a particular day or date range
export const getAllOrders = async (
  startDate = new Date(),
  endDate = new Date()
) => {
  // Define the start and end dates
  const start = startOfDay(startDate);
  const end = endOfDay(endDate || startDate); // If endDate is not provided, use the same date

  // Create a Firestore query with date filtering
  const q = query(
    collection(db, "orders"),
    where("date", ">=", start),
    where("date", "<=", end),
    orderBy("date", "desc"),
    limit(30)
  );

  // Get the documents from the query
  const salesSnapshot = await getDocs(q);

  // Map the documents to a list of order objects
  const orderlist = salesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return orderlist;
};
////GET ALL CUSTOMERS
export const getAllCustomers = async () => {
  const res = await getDocs(collection(db, "customers"));
  return res.docs;
};
export const getAllInventory = async () => {
  const res = await getDocs(collection(db, "inventories"));
  return res.docs;
};

///GET ALL ITEMS
export const getAllItems = async () => {
  const q = query(collection(db, "items"), orderBy("createdAt", "asc"));
  const res = await getDocs(q);
  return res.docs;
};

/////REDUCEITEMQUANTITY based on item name

export const reduceItemQuantityByName = async (itemName, quantitySold) => {
  try {
    const itemsCollection = collection(db, "items");
    const q = query(itemsCollection, where("name", "==", itemName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Item not found.");
      return;
    }

    let hasError = false;
    querySnapshot.forEach((itemDoc) => {
      const currentItem = itemDoc.data();
      const currentQuantity = currentItem.quantity;

      if (currentQuantity <= 0 || currentQuantity < quantitySold) {
        console.error(
          `Insufficient quantity for item: ${itemName}. Current quantity: ${currentQuantity}, Quantity requested: ${quantitySold}`
        );
        hasError = true;
      }
    });
    if (hasError) {
      return;
    }

    // If no errors, proceed with updates
    const updates = querySnapshot.docs.map((itemDoc) => {
      const currentItem = itemDoc.data();
      const updatedQuantity = currentItem.quantity - quantitySold;
      const itemDocRef = doc(db, "items", itemDoc.id);
      return updateDoc(itemDocRef, { quantity: updatedQuantity });
    });

    await Promise.all(updates);
    console.log("<---------item(s) sold--------->", itemName);
  } catch (error) {
    console.error("Error reducing item quantity:", error);
  }
};

export const trackSales = async (itemName) => {
  try {
    const itemSalesDoc = await getDocs(collection(db, "orders")).doc(itemName);
    await itemSalesDoc.set(
      {
        itemName,
        salesCount: db.FieldValue.increment(1),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error tracking sales:", error);
  }
};

////HANDLE SALES
export const handleSale = async (sale) => {
  console.log(sale.items);
  try {
    for (const item of sale.items) {
      const itemName = item.name;
      const quantitySold = parseInt(item.quantity, 10); // Ensure quantity is a number

      console.log(quantitySold, itemName);

      //////ITEM SOLD IS AVAILABLE HERE

      // Update the quantity and track the sale
      await reduceItemQuantityByName(itemName, quantitySold);
      await trackSales(itemName);
    }
  } catch (error) {
    console.error("Error handling sale:", error);
  }
};
