# Stage DAG — palcalculator

00 setup / domain / repo / permissions [BLOCKED_OWNER_SETUP]
01 research
  -> 02 PRD / route contract
    -> 03 pricing
    -> 04 compliance
      -> 05 SEO-copy freeze
        -> 06 design source
        -> 08 backend / data contract
          -> 07 frontend implementation
            -> 10 SEO recheck
            -> 04 compliance recheck
            -> 02 PM acceptance
              -> 09 QA
                -> 11 launch ops (also waits on 00 setup + owner deploy confirmation)
                  -> 12 data review

Parallel rules:
- pricing and compliance can run in parallel after PRD.
- backend/data can start after PRD + copy freeze; frontend waits for design + backend/data contract.
- SEO recheck, compliance recheck, PM acceptance can run after implementation.
- QA cannot be self-certified by implementers.
