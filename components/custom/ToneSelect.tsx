"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import usePostStore from "@/store/store";
const ToneSelect = () => {
  const { tone, setTone } = usePostStore();

  const toneOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "friendly", label: "Friendly" },
    { value: "professional", label: "Professional" },
    { value: "informative", label: "Informative" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "motivational", label: "Motivational" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "humorous", label: "Humorous" },
  ];

  return (
    <div>
      <Select onValueChange={setTone} value={tone}>
        <SelectTrigger>
          <SelectValue placeholder="Select A Tone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tone</SelectLabel>
            {toneOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ToneSelect;
