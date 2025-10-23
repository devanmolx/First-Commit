"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { IssueType } from "@/types/types";
import LatestIssuesTable from "./LatestIssuesTable";
import { X } from "lucide-react";

interface IssuesModalProps {
    open: boolean;
    onClose: () => void;
    projectName: string;
    issues: IssueType[];
}

const IssuesModal: React.FC<IssuesModalProps> = ({ open, onClose, projectName, issues }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="!max-w-[95vw] !w-full !h-[90vh] bg-slate-900 border-slate-800 overflow-y-auto">
                <DialogHeader className="flex flex-row items-center justify-between ">
                    <DialogTitle className="text-white">Issues for {projectName}</DialogTitle>
                    <DialogClose asChild>
                        <button className="text-white cursor-pointer">
                            <X className="w-5 h-5" />
                        </button>
                    </DialogClose>
                </DialogHeader>
                <LatestIssuesTable issues={issues} />
            </DialogContent>
        </Dialog>
    );
};

export default IssuesModal;
