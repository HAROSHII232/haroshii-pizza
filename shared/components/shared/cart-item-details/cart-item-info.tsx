type Props = {
  name: string;
  details: string;
};

export const CartItemInfo = ({ name, details }: Props) => {
  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
