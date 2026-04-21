import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { requiredDocuments, RequiredDocument } from "@/data/mockData";
import { FileText, Upload, RotateCcw, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const todayLabel = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

function StatusIndicator({ status }: { status: RequiredDocument["status"] }) {
  if (status === "verified")
    return (
      <StatusBadge tone="green" size={22}>
        <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
      </StatusBadge>
    );
  if (status === "pending")
    return (
      <StatusBadge tone="yellow" size={22}>
        <Clock className="h-3 w-3 mr-1" /> Pending
      </StatusBadge>
    );
  return (
    <StatusBadge tone="red" size={22}>
      <AlertTriangle className="h-3 w-3 mr-1" /> Missing
    </StatusBadge>
  );
}

function DocumentRow({ doc, onUpload }: { doc: RequiredDocument; onUpload: (id: string, file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 bg-card hover:bg-accent/40 transition-colors">
      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium leading-tight">{doc.name}</p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
          <span>Type: <span className="font-medium text-foreground">{doc.format}</span></span>
          <span>Category: {doc.category}</span>
          {doc.uploadedFile && (
            <span className="truncate">File: {doc.uploadedFile}{doc.size ? ` • ${doc.size}` : ""}{doc.uploadDate ? ` • ${doc.uploadDate}` : ""}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:flex-row-reverse">
        <input
          ref={inputRef}
          type="file"
          accept={doc.accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(doc.id, f);
            e.target.value = "";
          }}
        />
        <Button
          size="sm"
          variant={doc.status === "missing" ? "default" : "outline"}
          className="gap-1.5"
          onClick={() => inputRef.current?.click()}
        >
          {doc.status === "missing" ? <Upload className="h-3.5 w-3.5" /> : <RotateCcw className="h-3.5 w-3.5" />}
          {doc.status === "missing" ? "Upload" : "Replace"}
        </Button>
        <StatusIndicator status={doc.status} />
      </div>
    </div>
  );
}

export default function Documents() {
  const [docs, setDocs] = useState<RequiredDocument[]>(requiredDocuments);

  const handleUpload = (id: string, file: File) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "pending",
              uploadedFile: file.name,
              uploadDate: todayLabel(),
              size: formatBytes(file.size),
            }
          : d,
      ),
    );
    toast({ title: "Uploaded", description: `${file.name} submitted for verification.` });
  };

  const counts = {
    verified: docs.filter((d) => d.status === "verified").length,
    pending: docs.filter((d) => d.status === "pending").length,
    missing: docs.filter((d) => d.status === "missing").length,
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-muted-foreground">Upload required documents directly next to each entry.</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge tone="green">{counts.verified} Verified</StatusBadge>
          <StatusBadge tone="yellow">{counts.pending} Pending</StatusBadge>
          <StatusBadge tone="red">{counts.missing} Missing</StatusBadge>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Required Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-background">
            {docs.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} onUpload={handleUpload} />
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Accepted formats are listed per document. Maximum file size 5 MB. Re-uploading replaces the previous submission.
      </p>
    </div>
  );
}
