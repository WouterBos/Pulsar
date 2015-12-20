describe("Pulsar", function() {
  it("1+1=2", function() {
    var pt = new pulsar.pt();
    expect(pt.calc(1, 1)).toBe(2);
  });
});
