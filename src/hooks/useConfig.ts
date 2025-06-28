import { useEffect, useState } from "react";

type ConfigItem = {
  id: string;
  name: string;
  value: string;
};

export default function useConfig() {
  const [config, setConfig] = useState<ConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config");

        if (!res.ok) {
          throw new Error("Error al obtener la configuración");
        }

        const data: ConfigItem[] = await res.json();
        setConfig(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
}
