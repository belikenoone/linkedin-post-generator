import { useState } from "react";
import usePostStore from "@/store/store";
import { Loader2, Copy, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "../ui/use-toast";

const GeneratedPost = () => {
  const { currentPost, isLoading, prompt, error } = usePostStore();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentPost).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="col-span-2 flex flex-col h-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <div className="flex-grow p-6 space-y-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : currentPost.length === 0 ? (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800 font-semibold">
              No post generated yet
            </AlertTitle>
            <AlertDescription className="text-blue-600">
              Enter your prompt and click on Generate to create a post.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <h2 className="font-bold text-2xl text-gray-800 border-b pb-2">
              {prompt}
            </h2>
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-0 right-0 m-2 bg-gray-100 hover:bg-gray-200"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="text-green-500" /> : <Copy />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      {copied ? "Copied!" : "Copy The Post"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-gray-600 whitespace-pre-wrap pr-12">
                {currentPost}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t">
        <p className="text-sm text-gray-500 italic">
          Remember to customize the placeholders according to your needs.
        </p>
      </div>
    </div>
  );
};

export default GeneratedPost;
