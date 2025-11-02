type Props = {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
};

export default function EntryCard({ title, subtitle, children, footer }: Props) {
    return (
        <li className="border rounded p-3 bg-white">
            <div className="font-medium">{title}</div>
            {subtitle ? <div className="text-sm opacity-80">{subtitle}</div> : null}
            {children ? <div className="text-sm mt-2 whitespace-pre-wrap">{children}</div> : null}
            {footer ? <div className="text-xs mt-2 opacity-60">{footer}</div> : null}
        </li>
    );
}
