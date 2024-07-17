import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToneSelect from "./ToneSelect";
import { Button } from "../ui/button";
import usePostStore from "@/store/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { Progress } from "../ui/progress";
const InputForm = () => {
  const { toast } = useToast();
  const {
    currentPost,
    prompt,
    history,
    isLoading,
    error,
    setPrompt,
    generatePost,
    tone,
  } = usePostStore();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: error,
      });
    }
  }, [error]);

  return (
    <div className="col-span-2 flex flex-col justify-center gap-4">
      <Label htmlFor="prompt">Prompt</Label>
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        type="text"
        id="prompt"
        placeholder="Enter Prompt Here.."
        maxLength={100}
      />
      <Progress value={prompt.length} />
      <ToneSelect />
      {isLoading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button onClick={() => generatePost(tone)}>Generate</Button>
      )}
    </div>
  );
};

export default InputForm;
