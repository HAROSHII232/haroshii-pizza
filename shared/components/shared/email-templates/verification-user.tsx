type Props = {
  code: string;
};

export const VerificationUserTemplate = ({ code }: Props) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`https://haroshii-pizza.vercel.app/api/auth/verify?code=${code}`}>
        Подтвердить регистрацию
      </a>
    </p>
  </div>
);
