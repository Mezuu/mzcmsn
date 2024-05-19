import { Divider, Sheet } from "@mui/joy";
import React from "react";

export function SectionHeader({ children, id }: { children: React.ReactNode, id: string }) {
    return <Sheet id={id}>
        <Sheet id={`${id}-anchor`} sx={{ width: '100dvw' }}></Sheet>
        <Sheet id={`${id}-header`} sx={{ zIndex: 3 }}>
            {children}
        </Sheet>
        <Divider sx={{ my: 2 }} />
    </Sheet>
}