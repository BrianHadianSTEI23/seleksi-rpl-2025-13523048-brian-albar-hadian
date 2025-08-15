"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Initial editable data
const initialData = {
  title: "Subsidy X [Region Name]",
  packets: [
    { id: "A", name: "Paket A", value: 1000000 },
    { id: "B", name: "Paket B", value: 2000000 },
    { id: "C", name: "Paket C", value: 3000000 },
  ],
  vendor: { name: "Vendor Name" },
  sources: [
    { name: "APBN", value: 2500000 },
    { name: "CSR", value: 1500000 },
  ],
  target: 10000000,
  deadline: "2024-12-31",
};

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

export default function EditableSubsidy() {
  const [data, setData] = useState(initialData);

  // Update a packet
  const updatePacket = (index: number, key: string, value: any) => {
    const newPackets = [...data.packets];
    if (key === "value") value = Number(value);
    (newPackets[index] as any)[key] = value;
    setData({ ...data, packets: newPackets });
  };

  // Update a source
  const updateSource = (index: number, key: string, value: any) => {
    const newSources = [...data.sources];
    if (key === "value") value = Number(value);
    (newSources[index] as any)[key] = value;
    setData({ ...data, sources: newSources });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="border p-2 w-full rounded"
          />
        </CardContent>
      </Card>

      {/* Realization Packets */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Realization Packets</CardTitle>
        </CardHeader>
        <CardContent>
          {data.packets.map((packet, idx) => (
            <div key={idx} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={packet.name}
                onChange={(e) => updatePacket(idx, "name", e.target.value)}
                className="border p-1 rounded w-32"
              />
              <input
                type="number"
                value={packet.value}
                onChange={(e) => updatePacket(idx, "value", e.target.value)}
                className="border p-1 rounded w-32"
              />
              <span>{formatRupiah(packet.value)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Vendor */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            value={data.vendor.name}
            onChange={(e) => setData({ ...data, vendor: { name: e.target.value } })}
            className="border p-2 w-full rounded"
          />
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sources</CardTitle>
        </CardHeader>
        <CardContent>
          {data.sources.map((source, idx) => (
            <div key={idx} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={source.name}
                onChange={(e) => updateSource(idx, "name", e.target.value)}
                className="border p-1 rounded w-32"
              />
              <input
                type="number"
                value={source.value}
                onChange={(e) => updateSource(idx, "value", e.target.value)}
                className="border p-1 rounded w-32"
              />
              <span>{formatRupiah(source.value)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Target and Deadline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Target & Deadline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2 space-x-4">
            <label>Target:</label>
            <input
              type="number"
              value={data.target}
              onChange={(e) => setData({ ...data, target: Number(e.target.value) })}
              className="border p-1 rounded w-32"
            />
            <span>{formatRupiah(data.target)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label>Deadline:</label>
            <input
              type="date"
              value={data.deadline}
              onChange={(e) => setData({ ...data, deadline: e.target.value })}
              className="border p-1 rounded w-40"
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={() => console.log("Saved Data:", data)}
        className="mt-4"
      >
        Save
      </Button>
    </div>
  );
}
