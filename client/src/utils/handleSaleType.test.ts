import { handleSaleType } from "./";
import { SaleType } from "../interfaces";

describe("handleSaleType Function", () => {
  it("returns 'Venda de afiliado' for SaleType.afiliateSale", () => {
    const result = handleSaleType(SaleType.afiliateSale);
    expect(result).toBe("Venda de afiliado");
  });

  it("returns 'Comissão paga' for SaleType.comissionPaid", () => {
    const result = handleSaleType(SaleType.comissionPaid);
    expect(result).toBe("Comissão paga");
  });

  it("returns 'Comisão recebida' for SaleType.comissionReceived", () => {
    const result = handleSaleType(SaleType.comissionReceived);
    expect(result).toBe("Comisão recebida");
  });

  it("returns 'Venda do produtor' for SaleType.productorSale", () => {
    const result = handleSaleType(SaleType.productorSale);
    expect(result).toBe("Venda do produtor");
  });

  it("returns 'Venda realizada' for an unknown SaleType", () => {
    const result = handleSaleType(99); // Valor não reconhecido
    expect(result).toBe("Venda realizada");
  });
});
