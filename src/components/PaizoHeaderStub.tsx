export default function PaizoHeaderStub() {
    return (
        <div className="hidden">{/* Activar cuando mode=paizo */}
            <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded border">PF2e</button>
                <button className="px-3 py-1 rounded border">SF2e</button>
            </div>
        </div>
    );
}
