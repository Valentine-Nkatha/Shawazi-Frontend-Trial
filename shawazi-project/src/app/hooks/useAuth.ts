

const url = "/api/login";

export const userLogin = async ({
    phone_number,
    password,
}: {
    phone_number: string;
    password: string;
}) => {

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ phone_number, password }),
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
        console.error("Error in userLogin:", error);
        throw new Error("An error occurred while logging in."); 
      }
};

