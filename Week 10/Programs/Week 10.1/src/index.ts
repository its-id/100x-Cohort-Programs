import { Client } from "pg";
import dotenv from 'dotenv';

dotenv.config();

// STEP 1: CONNECT TO DATABASE
const client = new Client({
    connectionString: process.env.DATABASE_URL,
})






// STEP 2: CREATE TABLE
/*
async function createUsersTable(){

    await client.connect();
    const result = await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`)
    console.log(result);
}

createUsersTable();
*/





// STEP 3: INSERT DATA INTO TABLE (!NOT RECOMMENDED, PRONE TO SQL INJECTION ATTACKS!)
/*
async function insertData() {
  try {
    await client.connect(); // Ensure client connection is established
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
    const res = await client.query(insertQuery);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

insertData();
*/





// STEP 3: INSERT DATA INTO TABLE (RECOMMENDED WAY)
/*
async function insertData(username: string, email: string, password: string) {
  try {
    await client.connect(); // Ensure client connection is established
    // Use parameterized query to prevent SQL injection
    const insertQuery =
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertData('username5', 'user5@example.com', 'user_password').catch(
  console.error
);
*/





// STEP 4: GET USERS FROM TABLE
/*
// Async function to fetch user data from the database given an email
async function getUser(email: string) {
  try {
    await client.connect(); // Ensure client connection is established
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser('user5@example.com').catch(console.error);
*/


// STEP 5: CREATING A FOREIGN TABLE AND CREATING RELATIONSHIP
/*
async function createAddressesTable(){
    await client.connect();
    const result = await client.query(`
    CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
    console.log(result);
}
createAddressesTable();
*/

// STEP 6: INSERTING DATA INTO FOREIGN TABLE (WITHOUT USING TRANSACTION)
/*
async function insertDataIntoAddressesTable(user_id: number, city: string, country: string, street: string, pincode: string){
    try {
        await client.connect();
        const insertQuery = 'INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)';
        const values = [user_id, city, country, street, pincode];
        const res = await client.query(insertQuery, values);
        console.log('Insertion success:', res);
    } catch (err) {
        console.error('Error during the insertion:', err);
    } finally {
        await client.end();
    }
}

// Example usage
insertDataIntoAddressesTable(1, 'New York', 'USA', '1234, Street Name', '123').catch(console.error);
*/








// STEP 7: INSERTING DATA INTO FOREIGN TABLE (USING TRANSACTION)
/*
async function insertDataIntoAddressesTable(user_id: number, city: string, country: string, street: string, pincode: string){
    try {
        await client.connect();

        // Begin the transaction
        await client.query('BEGIN');
        const insertQuery = 'INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)';
        const values = [user_id, city, country, street, pincode];
        const res = await client.query(insertQuery, values);
        console.log('Insertion success:', res);

        // Commit the transaction
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error during the insertion:', err);
    } finally {
        await client.end();
    }
}

// Example usage
insertDataIntoAddressesTable(1, 'New York', 'USA', '1234, Street Name', '123').catch(console.error);
*/




// STEP 8: GETTING USER WITH ADDRESS (WITHOUT JOIN) (NOT RECOMMENDED)
/*
async function getUserWithAddress(email: string) {
    try {
        await client.connect();
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);
    
        if (result.rows.length > 0) {
          console.log('User found:', result.rows[0]);
          const user = result.rows[0];
          const addressQuery = 'SELECT * FROM addresses WHERE user_id = $1';
          const addressValues = [user.id];
          const addressResult = await client.query(addressQuery, addressValues);
          if (addressResult.rows.length > 0) {
            console.log('Address found:', addressResult.rows[0]);
            user.address = addressResult.rows[0];
          } else {
            console.log('No address found for the user.');
          }
          return user;
        } else {
          console.log('No user found with the given email.');
          return null;
        }
      } catch (err) {
        console.error('Error during fetching user:', err);
        throw err;
      } finally {
        await client.end();
      }
}

getUserWithAddress('user3@example.com');
*/









// STEP 8: GETTING USER WITH ADDRESS (WITH JOIN) (RECOMMENDED)
/*
async function getUserWithAddress(email: string) {
    try {
        await client.connect();
        const query = 'SELECT * FROM users u JOIN addresses a ON u.id = a.user_id WHERE u.email = $1';
        const values = [email];
        const result = await client.query(query, values);
    
        if (result.rows.length > 0) {
          console.log('User found:', result.rows[0]);
          return result.rows[0];
        } else {
          console.log('No user found with the given email.');
          return null;
        }
      } catch (err) {
        console.error('Error during fetching user:', err);
        throw err;
      } finally {
        await client.end();
      }
}

getUserWithAddress('user3@example.com');
*/