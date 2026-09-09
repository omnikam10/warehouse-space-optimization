import "./recommendations.css";

const Recommendations = () => {
  return (
    <main className="recommendations-page">
      {/* PAGE HEADER */}
      <div className="recommendations-header">
        <h1>Optimization Recommendations</h1>
        <p>AI-powered insights for warehouse improvement</p>
      </div>

      {/* STATS */}
      <section className="recommendation-stats">
        <div className="recommendation-stat">
          <h2>4</h2>
          <p>Active Recommendations</p>
        </div>

        <div className="recommendation-stat">
          <h2>$26.7K</h2>
          <p>Potential Annual ROI</p>
        </div>

        <div className="recommendation-stat">
          <h2>2</h2>
          <p>Implemented This Month</p>
        </div>

        <div className="recommendation-stat">
          <h2>3.2 weeks</h2>
          <p>Avg Implementation Time</p>
        </div>
      </section>

      {/* ACTIVE RECOMMENDATIONS */}
      <section className="recommendations-section">
        <h2>Active Recommendations</h2>

        {/* Recommendation 1 */}
        <div className="recommendation-card">
          <div className="recommendation-card-header">
            <div className="recommendation-title">
              <h3>Reduce Grading Area by 30%</h3>

              <span className="recommendation-tag high">
                high priority
              </span>

              <span className="recommendation-tag pending">
                pending
              </span>
            </div>
          </div>

          <p className="recommendation-description">
            Reducing space by 200 sq ft and reallocating to packaging.
          </p>

          <ul className="recommendation-metrics">
            <li>15% efficiency gain</li>
            <li>$12,000/year</li>
            <li>2–3 weeks</li>
          </ul>

          <div className="recommendation-progress">
            <div
              className="recommendation-progress-fill"
              style={{ width: "92%" }}
            />
          </div>

          <div className="recommendation-actions">
            <button type="button" className="secondary-button">
              View Details
            </button>

            <button type="button" className="primary-button">
              Implement →
            </button>
          </div>
        </div>

        {/* Recommendation 2 */}
        <div className="recommendation-card">
          <div className="recommendation-title">
            <h3>Expand Canteen Capacity</h3>

            <span className="recommendation-tag medium">
              medium priority
            </span>

            <span className="recommendation-tag pending">
              pending
            </span>
          </div>

          <p className="recommendation-description">
            Expanding seating reduces peak lunch congestion.
          </p>

          <ul className="recommendation-metrics">
            <li>40% wait reduction</li>
            <li>$8,500/year</li>
            <li>4–6 weeks</li>
          </ul>

          <div className="recommendation-progress">
            <div
              className="recommendation-progress-fill"
              style={{ width: "87%" }}
            />
          </div>

          <div className="recommendation-actions">
            <button type="button" className="secondary-button">
              View Details
            </button>

            <button type="button" className="primary-button">
              Implement →
            </button>
          </div>
        </div>

        {/* Recommendation 3 */}
        <div className="recommendation-card">
          <div className="recommendation-title">
            <h3>Optimize Forklift Routes</h3>

            <span className="recommendation-tag medium">
              medium priority
            </span>

            <span className="recommendation-tag in-progress">
              in-progress
            </span>
          </div>

          <p className="recommendation-description">
            Optimized paths reduce travel time.
          </p>

          <ul className="recommendation-metrics">
            <li>12% faster</li>
            <li>$6,200/year</li>
            <li>1–2 weeks</li>
          </ul>

          <div className="recommendation-progress">
            <div
              className="recommendation-progress-fill"
              style={{ width: "78%" }}
            />
          </div>

          <div className="recommendation-actions">
            <button type="button" className="secondary-button">
              View Details
            </button>

            <button type="button" className="primary-button">
              Implement →
            </button>
          </div>
        </div>
      </section>

      {/* RECENTLY IMPLEMENTED */}
      <section className="recent-recommendations-section">
        <h2>Recently Implemented</h2>

        <div className="recent-recommendation-card">
          <strong>Reorganized Loading Dock Layout</strong>

          <p>
            Implemented on 2024-05-15 — 18% efficiency improvement
          </p>
        </div>

        <div className="recent-recommendation-card">
          <strong>Added Storage Aisle Markings</strong>

          <p>
            Implemented on 2024-05-10 — 8% reduction in navigation time
          </p>
        </div>
      </section>
    </main>
  );
};

export default Recommendations;