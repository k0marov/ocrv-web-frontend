import React, { useEffect, useState } from "react";
import { Bloc } from "./Bloc";



interface BlocProviderProps<S, B extends Bloc<S>> {
    create: () => B,
    children: React.ReactNode[] | React.ReactNode,
}

function BlocProviderFactory<S, B extends Bloc<S>>(context: React.Context<B | null>) {
    function BlocProvider({ create, children }: BlocProviderProps<S, B>) {
        const [bloc, setBloc] = useState<B | null>(null);
        useEffect(() => {
            const createdBloc = create();
            setBloc(createdBloc);
            return createdBloc.dispose;
        }, [create]);
        if (bloc == null) return <></>;

        return (
            <context.Provider value={bloc}>
                {children}
            </context.Provider>
        );
    }

    return BlocProvider;
}

export default BlocProviderFactory;