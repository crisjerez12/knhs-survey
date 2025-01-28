"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { Packages } from "../lib/type";

// Define the shape of the context value
interface OffersContextType {
  occasions: Packages[];
  loading: boolean;
  error: Error | null;
}

// Create the context
const OffersContext = createContext<OffersContextType | undefined>(undefined);

// Create the provider component
export function OffersProvider({ children }: { children: React.ReactNode }) {
  const [occasions, setOccasions] = useState<Packages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const { data, error } = await supabase.from("packages").select("*");

        if (error) {
          throw error;
        }

        setOccasions(data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <OffersContext.Provider value={{ occasions, loading, error }}>
      {children}
    </OffersContext.Provider>
  );
}

// Create a custom hook to use the context
export function useOffers() {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error("useOffers must be used within an OffersProvider");
  }
  return context;
}
