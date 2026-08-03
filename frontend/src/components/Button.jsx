function Button({ text }) {
  return (
    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">
      {text}
    </button>
  );
}

export default Button;